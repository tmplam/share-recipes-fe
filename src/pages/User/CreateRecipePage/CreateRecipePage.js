import classNames from 'classnames/bind';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Editor } from '@tinymce/tinymce-react';

import styles from './CreateRecipePage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';
import useForceReload from '~/hooks/useForceReload';

const cx = classNames.bind(styles);

const tinyInit = {
    // statusbar: false,
    height: 400,
    menubar: false,
    plugins: [
        'wordcount',
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'code',
        'wordcount',
    ],
    toolbar:
        'undo redo | blocks | ' +
        'bold italic underline | forecolor backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat',
    content_style: `
        body { font-family: cursive }
        p { margin: 2px 0 }
        ul, ol { margin: 8px 0 }
        `,
};

function AddRecipePage() {
    const { auth } = useAuth();
    const { _totalPending } = useForceReload();
    const navigate = useNavigate();

    const nameRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const timeRef = useRef();

    const descRef = useRef();
    const ingreRef = useRef();
    const instructRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios
            .get(`recipe-categories`)
            .then((response) => {
                const data = response.data;
                setCategoryList(data.data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        let valid = true;

        // Check name
        if (nameRef.current.value.trim() === '') {
            nameRef.current.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng nhập tên!';
            valid = false;
        } else {
            formData.append('name', nameRef.current.value.trim());
            nameRef.current.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        // Check category
        if (categoryRef.current.value.trim() === '') {
            categoryRef.current.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng chọn loại!';
            valid = false;
        } else {
            formData.append('category', categoryRef.current.value.trim());
            categoryRef.current.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        // Check image
        if (imageRef.current.files.length === 0) {
            imageRef.current.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng chọn ảnh!';
            valid = false;
        } else {
            formData.append('image', imageRef.current.files[0]);
            console.log(imageRef.current.files[0]);
            imageRef.current.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        // Check description
        if (descRef.current.plugins.wordcount.getCount() < 20) {
            descRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng nhập hơn 20 từ!';
            valid = false;
        } else {
            formData.append('description', descRef.current.getContent());
            descRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        // Check ingredients
        if (ingreRef.current.plugins.wordcount.getCount() < 20) {
            ingreRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng nhập hơn 20 từ!';
            valid = false;
        } else {
            formData.append('ingredients', ingreRef.current.getContent());
            ingreRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        // Check instruction
        if (instructRef.current.plugins.wordcount.getCount() < 20) {
            instructRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng nhập hơn 20 từ!';
            valid = false;
        } else {
            formData.append('instruction', instructRef.current.getContent());
            instructRef.current.targetElm.parentNode.querySelector(`.${cx('error')}`).innerText =
                '';
        }

        // Check time
        if (!/^[1-9]\d*$/.test(timeRef.current.value.trim())) {
            timeRef.current.parentNode.querySelector(`.${cx('error')}`).innerText =
                'Vui lòng nhập số nguyên dương!';
            valid = false;
        } else {
            formData.append('estimatedTime', timeRef.current.value.trim());
            timeRef.current.parentNode.querySelector(`.${cx('error')}`).innerText = '';
        }

        if (valid) {
            try {
                setIsSubmitting(true);
                const response = await axios.post('/user/recipes', formData, {
                    headers: {
                        Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                    },
                });
                setIsSubmitting(false);
                _totalPending.setReloadTotalPending({});
                navigate('/', { replace: true });
                toast.success(response.data.message);
            } catch (error) {
                // Xử lý lỗi
                toast.error(error.response.data.message);
            }
        }
    }

    // Show preview image
    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    return (
        <Container className="">
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={9} lg={8} xl={6}>
                    <div className={`${cx('wrapper')}`}>
                        <div
                            className={cx('header-img')}
                            style={{
                                backgroundImage: `url(${images.formBackground})`,
                            }}
                        >
                            <div className={cx('thumbnail-wrapper')}>
                                <img
                                    className={`${cx('thumbnail')} img-thumbnail`}
                                    src={images.thumbnail_1}
                                    alt="thumbnail"
                                />
                                <img
                                    className={`${cx('thumbnail')} img-thumbnail`}
                                    src={images.thumbnail_2}
                                    alt="thumbnail"
                                />
                                <img
                                    className={`${cx('thumbnail')} img-thumbnail`}
                                    src={images.thumbnail_3}
                                    alt="thumbnail"
                                />
                            </div>
                        </div>
                        <div className={cx('form-wrapper')}>
                            <h1 className={cx('form-title')}>CHIA SẺ CÔNG THỨC</h1>
                            <span className={cx('form-subtitle')}>
                                Chia sẻ niềm vui nấu ăn cho mọi người
                            </span>
                            <form className={cx('form')} spellCheck="false" onSubmit={handleSubmit}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="name">Tên công thức</label>
                                    <input
                                        id="name"
                                        autoComplete="false"
                                        className={cx('form-control')}
                                        type="text"
                                        placeholder="Tên công thức"
                                        ref={nameRef}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="category">Loại công thức</label>
                                    <select
                                        id="category"
                                        className={cx('form-control')}
                                        ref={categoryRef}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            -- Chọn loại --
                                        </option>
                                        {categoryList.map((category) => (
                                            <option
                                                key={category.categoryid}
                                                value={category.categoryid}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="image">Hình ảnh</label>
                                    <input
                                        id="image"
                                        onChange={onSelectFile}
                                        ref={imageRef}
                                        className={cx('form-control', 'form-file')}
                                        type="file"
                                        accept="image/*"
                                    />
                                    <span className={cx('error')}></span>
                                    {selectedFile && (
                                        <img className={cx('old-img')} src={preview} alt="avatar" />
                                    )}
                                </div>

                                <div className={cx('form-group')}>
                                    <label>Mô tả</label>
                                    <Editor
                                        apiKey="e66hvcl6cot54m4i4iv87j73ukdk8ulfp831tjbi0h502kfy"
                                        onInit={(evt, editor) => (descRef.current = editor)}
                                        init={tinyInit}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label>Nguyên liệu</label>
                                    <Editor
                                        apiKey="e66hvcl6cot54m4i4iv87j73ukdk8ulfp831tjbi0h502kfy"
                                        onInit={(evt, editor) => (ingreRef.current = editor)}
                                        init={tinyInit}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label>Hướng dẫn</label>
                                    <Editor
                                        apiKey="e66hvcl6cot54m4i4iv87j73ukdk8ulfp831tjbi0h502kfy"
                                        onInit={(evt, editor) => (instructRef.current = editor)}
                                        init={tinyInit}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="time">Thời gian nấu (phút)</label>
                                    <input
                                        id="time"
                                        autoComplete="false"
                                        className={cx('form-control')}
                                        placeholder="Thời gian nấu"
                                        type="number"
                                        ref={timeRef}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <Button
                                    disabled={isSubmitting}
                                    rounded
                                    w100
                                    green
                                    center
                                    type="submit"
                                    rightIcon={
                                        isSubmitting ? (
                                            <Spinner animation="border" variant="light" />
                                        ) : (
                                            false
                                        )
                                    }
                                >
                                    Đăng
                                </Button>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddRecipePage;
