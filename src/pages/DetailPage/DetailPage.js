import classNames from 'classnames/bind';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

import CommentItem from './components/CommentItem';
import Button from '~/components/Button';
import styles from './DetailPage.module.scss';
// import axios from '~/utils/api';

const cx = classNames.bind(styles);

const RECIPE = {
    image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
    name: 'Bò sốt tiêu đen như tâm hồn của bạn',
    time: 20,
    stars: 4,
    reviews: 10,
    desc: `Món bò sốt tiêu đen (Black Pepper Beef) là một món ăn ngon và phổ biến trong nhiều nền ẩm thực Á Đông. Món này thường có vị thơm ngon, ngọt ngào, cay cay từ tiêu đen và mặn mặn từ nước tương. Dưới đây là một phần giới thiệu về món này.`,
    type: 'Tráng bụng',
    indredients: (
        <ul>
            <li>400g thịt bò (loại nạc dày như bò bắp hoặc bò tái lát mỏng)</li>
            <li>1-2 quả hành tây, cắt thành lát mỏng</li>
            <li>3-4 tép tỏi, băm nhuyễn</li>
            <li>1-2 ớt sừng đỏ (tùy khẩu vị), cắt mỏng (loại ớt có nhiệt độ tuỳ ý)</li>
            <li>1/2-1 quả ớt chuông đỏ, cắt mỏng</li>
            <li>2-3 muỗng canh dầu ăn</li>
            <li>2-3 muỗng canh nước tương</li>
            <li>1 muỗng canh nước mắm</li>
            <li>1 muỗng canh tiêu đen xay mịn</li>
            <li>1/2 muỗng cà phê đường</li>
            <li>
                Rau sống (bắp cải, cải xanh, ngò rí, hoặc bất kỳ loại rau sống nào bạn thích) để
                trang trí
            </li>
        </ul>
    ),
    guid: (
        <ul>
            <li>
                Chuẩn bị thịt bò bằng cách cắt thành lát mỏng. Bạn có thể để thịt nguyên hoặc cắt
                thành sợi mỏng theo sợi thịt.
            </li>
            <li>
                Trong một tô, trộn thịt bò với nước tương, nước mắm, tiêu đen xay mịn và đường. Đậy
                tô bò vào tủ lạnh để thịt hấp thu gia vị ít nhất 30 phút.
            </li>
            <li>
                Trong một nồi hoặc chảo, đun nóng dầu ăn ở lửa lớn. Khi dầu nóng, thêm tỏi băm và
                xào cho đến khi thơm và có màu vàng.
            </li>
            <li>
                Thêm thịt bò đã ngâm gia vị vào nồi và xào lên tới khi thịt chuyển sang màu nâu và
                chín.
            </li>
            <li>
                Tiếp theo, thêm hành tây, ớt sừng và ớt chuông vào nồi. Nấu thêm vài phút nữa để rau
                cải và ớt chín mềm, nhưng vẫn giữ nguyên màu sắc tươi sáng.
            </li>
            <li>Thêm thêm tiêu đen xay mịn và nấu chung trong khoảng 1-2 phút nữa.</li>
            <li>Khi mọi thứ đã chín và hỗn hợp thịt bò có mùi thơm, bạn có thể tắt bếp.</li>
            <li>Đặt món bò sốt tiêu đen lên đĩa và trang trí với rau sống.</li>
        </ul>
    ),
};

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
    // let { recipeId } = useParams();
    // const { recipe, setRecipe } = useState({});

    // useEffect(() => {
    //     axios.get('')
    // }, [recipe]);

    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('recipe-info')}>
                    <h1 className={cx('name')}>{RECIPE.name}</h1>
                    <div className={cx('detail')}>
                        <div className={cx('desc')}>
                            <img className={cx('food-img')} src={RECIPE.image} alt="anh" />
                            <div className={cx('desc-detail')}>
                                <p>{RECIPE.desc}</p>
                                <p>
                                    <strong>TYPE: </strong> {RECIPE.type}
                                </p>
                            </div>
                        </div>
                        <div className={cx('ingre-wrapper')}>
                            <h2 className={cx('title')}>Nguyên liệu</h2>
                            <div>{RECIPE.indredients}</div>
                        </div>
                        <div className={cx('guid-wrapper')}>
                            <h2 className={cx('title')}>Hướng dẫn</h2>
                            <div>{RECIPE.guid}</div>
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
