import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import Button from '~/components/Button';
import FoodItem from '~/pages/HomePage/components/FoodItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const RECIPES_ITEM = [
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgur',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.9hy9vmaBnEr2ufyaXsP1UQHaHa?pid=ImgDet&w=500&h=500&rs=1',
        name: 'Noodle',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.09fc02f79025c0ab41021878d475e6eb?rik=v%2fH1ZQGvBCGLng&riu=http%3a%2f%2ffoodology.ca%2fwp-content%2fuploads%2f2019%2f04%2fstarbucks-summer-frappuccino-1-620x930.jpg&ehk=X0PYJDlXsGpJdBxu1KUJ0xOo743Dwt6JLe8PFHRiwXY%3d&risl=&pid=ImgRaw&r=0',
        name: 'Matcha',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.b78eeff1d8318e10b5b856987b87128c?rik=5a1xRA5Ps0YXXA&riu=http%3a%2f%2ffoodisafourletterword.com%2fwp-content%2fuploads%2f2020%2f11%2fVietnamese_Chicken_Banh_Mi_Recipe_Banh_Mi_Ga_Roti_new2.jpg&ehk=57vR67zsj1QYi95KKPIdFUstdMy2CVRIGiK0U8sUVbk%3d&risl=&pid=ImgRaw&r=0',
        name: 'Bánh mì',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.074d9129be8d236081dbbe9d28e89e8c?rik=e%2fMjesjXDakENg&pid=ImgRaw&r=0',
        name: 'Phở bò',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.0lM593xkQsYglwZlrzA0AgHaHa?pid=ImgDet&rs=1',
        name: 'Matcha socola',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.m5nPkqe6S6xp9dhZvrIOdwHaD4?pid=ImgDet&rs=1',
        name: 'Hủ tiếu',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.645e9c75227cec18ccc0969e2b40c8d9?rik=mJbvjh63r0Hu2w&riu=http%3a%2f%2fcdn1.vietnamtourism.org.vn%2fimages%2fcom-tam_jpg.jpg&ehk=8uQOKbVC2J77LG2RqFLNmdFA%2fM%2bjX6nCBK4vx07YheA%3d&risl=&pid=ImgRaw&r=0',
        name: 'Cơm sườn',
        time: 20,
        stars: 4,
        reviews: 10,
    },
];

function HomePage() {
    return (
        <div className="grid wide">
            <div className={`${cx('wrapper')}`}>
                <div
                    className={cx('brand')}
                    style={{
                        backgroundImage: `url(${images.background})`,
                    }}
                >
                    <h1 className={cx('slogan')}>LEARN, COOK & EAT YOUR MEALS</h1>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <p className={cx('info-item-number')}>24</p>
                            <p className={cx('info-item-title')}>Total items</p>
                        </div>
                        <div className={cx('info-item')}>
                            <p className={cx('info-item-number')}>09</p>
                            <p className={cx('info-item-title')}>Categories</p>
                        </div>
                    </div>
                </div>
                <div className={cx('category')}>
                    <ul className={cx('category-list')}>
                        <li className={cx('category-item')}>
                            <Button small rounded center dark>
                                Pizza
                            </Button>
                        </li>
                        <li className={cx('category-item')}>
                            <Button small inactive rounded center>
                                Dessert
                            </Button>
                        </li>
                        <li className={cx('category-item')}>
                            <Button small inactive rounded center>
                                Noodle
                            </Button>
                        </li>
                        <li className={cx('category-item')}>
                            <Button small inactive rounded center>
                                Cocktails
                            </Button>
                        </li>
                        <li className={cx('category-item')}>
                            <Button small inactive rounded center>
                                Salad
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={cx('filter')}>
                    <p className={cx('filter-name')}>ALL RECIPES</p>

                    <div>
                        <label className={cx('sort-label')} htmlFor="sort-food">
                            Sort by:
                        </label>

                        <select className={cx('sort-food')} id="sort-food">
                            <option value="rating">Rating</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>
                <div className="grid">
                    <div className={`row`}>
                        {RECIPES_ITEM.map((recipe, index) => (
                            <div key={index} className={`col l-2-4 m-4 c-6`}>
                                <FoodItem {...recipe} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
