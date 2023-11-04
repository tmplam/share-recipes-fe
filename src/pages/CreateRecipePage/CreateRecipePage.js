import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import styles from './CreateRecipePage.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AddRecipePage() {
    const [namehValue, setNameValue] = useState('');
    const imageRef = useRef();
    const [categoryValue, setCategoryValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const descRef = useRef(null);
    const ingreRef = useRef(null);
    const instructRef = useRef(null);

    const tinyInit = {
        statusbar: false,
        height: 400,
        menubar: false,
        plugins: [
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
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
        content_style: `
            body { font-family: cursive }
            p { margin: 2px 0 }
            ul, ol { margin: 8px 0 }
            `,
    };

    function handleSubmit(event) {
        event.preventDefault();

        console.log(namehValue);
        console.log(imageRef.current.files[0]);
        console.log(categoryValue);
        console.log(timeValue);

        // console.log(descRef.current.getContent());
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
                                        value={namehValue}
                                        onChange={(e) => setNameValue(e.target.value)}
                                        className={cx('form-control')}
                                        type="text"
                                        placeholder="Tên công thức"
                                        required
                                    />
                                    <span className={cx('error')}></span>
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="category">Loại công thức</label>
                                    <select
                                        value={categoryValue}
                                        onChange={(e) => setCategoryValue(e.target.value)}
                                        id="category"
                                        className={cx('form-control')}
                                    >
                                        <option value="0">Món chính</option>
                                        <option value="1">Tráng miệng</option>
                                        <option value="2">Đồ uống</option>
                                        <option value="3">Tàu nhanh</option>
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
                                        required
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
                                        required
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
                                        value={timeValue}
                                        onChange={(e) => setTimeValue(e.target.value)}
                                        className={cx('form-control')}
                                        placeholder="Thời gian nấu"
                                        type="text"
                                        required
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
