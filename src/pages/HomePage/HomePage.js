import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Button from '~/components/Button';
import FoodItem from '~/components/FoodItem';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const RECIPES_ITEM = [
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Special Salad',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
        time: 20,
        stars: 4,
        reviews: 10,
    },
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgurs',
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
