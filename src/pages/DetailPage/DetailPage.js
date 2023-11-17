import classNames from 'classnames/bind';
import { faStar, faHeart, faPlateWheat, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CommentItem from './components/CommentItem';
import Button from '~/components/Button';
import styles from './DetailPage.module.scss';
import axios from '~/utils/api';

const cx = classNames.bind(styles);

const COMMENTS = [
    {
        avatar: 'https://th.bing.com/th/id/OIP.3XUBe-nY31d3nFjbDDCgkAHaHa?pid=ImgDet&rs=1',
        username: 'Trần Mỹ Phú Lâm',
        content: 'Ngon nhứt cái nách!',
    },
    {
        avatar: 'https://i.pinimg.com/originals/bb/9c/12/bb9c123bccaca4ae498c97bfa615cc58.jpg',
        username: 'Nguyễn Võ Nhật Huy',
        content: 'Tuyệt vời luôn bạn ơi!',
    },
    {
        avatar: 'https://i.pinimg.com/originals/6f/a1/cb/6fa1cbfc4942859eb10c499465383efe.png',
        username: 'Nguyễn Hưng Yên',
        content: 'Chỉ cái đ*ll gì nấu é* được phí thời gian vl',
    },
    {
        avatar: 'https://th.bing.com/th/id/OIP.Uty5ZuOyeRdCfnvtxUJnmwHaE3?pid=ImgDet&rs=1',
        username: 'Vương Huỳnh Khải',
        content: 'Good recipe! Vote 5 stars!',
    },
    {
        avatar: 'https://vignette3.wikia.nocookie.net/detective-conan/images/5/5f/Vodka.jpg/revision/latest?cb=20110629124627&path-prefix=es',
        username: 'Tạ Ngọc Duy Khiêm',
        content: 'Dỡ vãi l*n!',
    },
];

function DetailPage() {
    let { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        axios
            .get(`recipes/${recipeId}`)
            .then((response) => {
                setRecipe(response?.data.data);
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('recipe-info')}>
                    <h1 className={cx('name')}>{recipe.name}</h1>
                    <div className={cx('detail')}>
                        <div className={cx('desc')}>
                            <img className={cx('food-img')} src={recipe.recipeavatar} alt="anh" />
                            <div className={cx('desc-detail')}>
                                <div>
                                    <h2 className={cx('title')}>
                                        <FontAwesomeIcon icon={faNewspaper} /> Mô tả:
                                    </h2>
                                    <p>{recipe.description}</p>
                                </div>
                                <p>
                                    <strong style={{ fontWeight: 600, fontSize: 2.2 + 'rem' }}>
                                        Loại:{' '}
                                    </strong>{' '}
                                    {recipe.category}
                                </p>
                            </div>
                        </div>
                        <div className={cx('ingre-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faPlateWheat} /> Nguyên liệu:
                            </h2>
                            <div>{recipe.ingredients}</div>
                        </div>
                        <div className={cx('guid-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faUtensils} /> Hướng dẫn:
                            </h2>
                            <div>{recipe.instruction}</div>
                        </div>
                    </div>
                </div>

                <div className={cx('action')}>
                    <div className={cx('save')}>
                        <p>Add to your favourite</p>
                        <Button
                            large
                            primary
                            center
                            className={cx('favourite-btn')}
                            title="Add to favourite"
                            leftIcon={<FontAwesomeIcon icon={faHeart} />}
                        >
                            Save
                        </Button>
                    </div>
                    <div className={cx('rating')}>
                        <p>Rating the recipe</p>
                        <div className={cx('stars')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>
                </div>

                <div className={cx('comment-wrapper')}>
                    <h2>Bình luận</h2>
                    <div className={'comment-list'}>
                        {COMMENTS.map((comment, index) => (
                            <CommentItem data={comment} key={index} />
                        ))}
                        <div className={cx('input-group')}>
                            <img className={cx('avatar')} src={COMMENTS[0].avatar} alt="avatar" />
                            <input className={cx('cmt-input')} placeholder="Nhập bình luận ..." />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default DetailPage;
