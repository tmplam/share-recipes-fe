import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import styles from './CreateRecipePage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

import axios from '~/utils/api';

const cx = classNames.bind(styles);

function AddRecipePage() {
    const nameRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const timeRef = useRef();

    const descRef = useRef();
    const ingreRef = useRef();
    const instructRef = useRef();

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

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios
            .get(`recipe-categories`)
            .then((response) => {
                const data = response.data;
                setCategoryList(data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (nameRef.current.value.trim() === '') {
            // console.log(123);
        }

        // console.log(nameValue);
        // console.log(imageRef.current.files[0]);
        // console.log(categoryValue);
        // console.log(timeValue);

        console.log(descRef.current.plugins.wordcount.getCount());
        console.log(ingreRef.current.getContent());
        console.log(instructRef.current.getContent());
    }

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
                                        ref={imageRef}
                                        className={cx('form-control', 'form-file')}
                                        type="file"
                                    />
                                    <span className={cx('error')}></span>
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
                                        type="text"
                                        ref={timeRef}
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <Button rounded w100 green center type="submit">
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
