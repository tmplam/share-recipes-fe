import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBowlFood,
    faTags,
    faChartSimple,
    faCalendar,
    faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

import styles from './StatisticsPage.module.scss';
import axios from '~/utils/api';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const options_1 = {
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'THỐNG KÊ THEO LOẠI',
            color: '#666',
            font: {
                weight: 'bold',
                size: 24,
            },
        },
    },
};

const options_2 = {
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: true,
            text: 'THỐNG KÊ THEO THÁNG',
            color: '#666',
            font: {
                weight: 'bold',
                size: 24,
            },
        },
    },
};

function StatisticsPage() {
    const { auth } = useAuth();
    const [categoryList, setCategoryList] = useState([]);
    const [recipeByMonth, setRecipeByMonth] = useState([]);
    const [recipeByCategory, setRecipeByCategory] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [category, setCategory] = useState('');

    const [totalRecipe, setTotalRecipe] = useState(0);
    const [totalCategory, setTotalCategory] = useState(0);
    const [totalRecipeInYear, setTotalRecipeInYear] = useState(0);
    const [totalRecipeInMonth, setTotalRecipeInMonth] = useState(0);

    useEffect(() => {
        axios
            .get(`recipes/count`)
            .then((response) => {
                let data = response.data.data;
                setTotalRecipe(data.count);
            })
            .catch((err) => {
                // console.log(err);
            });

        axios
            .get(`recipe-categories/count`)
            .then((response) => {
                let data = response.data.data;
                setTotalCategory(data.count);
            })
            .catch((err) => {
                // console.log(err);
            });

        axios
            .get(`recipes/count/statistic?year=${new Date().getFullYear()}`, {
                headers: {
                    Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                },
            })
            .then((response) => {
                let data = response.data.data;
                let totalInYear = data.recipeCountByMonth.reduce(
                    (accumulator, currentValue, index) => {
                        return accumulator + currentValue.num_recipes;
                    },
                    0,
                );
                let totalInMonth = data.recipeCountByMonth[new Date().getMonth()].num_recipes;
                setTotalRecipeInYear(totalInYear);
                setTotalRecipeInMonth(totalInMonth);
            })
            .catch((err) => {
                // console.log(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios
            .get(`recipes/count/statistic?year=${year}&category=${category}`, {
                headers: {
                    Authorization: auth?.token !== 'EXPIRED' ? auth?.token : null,
                },
            })
            .then((response) => {
                let data = response.data.data;
                let statisticByMonth = data.recipeCountByMonth.map((item) => item.num_recipes);
                setRecipeByCategory(data.recipeCountByCategory);
                setRecipeByMonth(statisticByMonth);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [category, year, auth?.token]);

    const recipeByMonthChartData = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Số lượng công thức',
                data: recipeByMonth,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        axios
            .get(`recipe-categories`)
            .then((response) => {
                let data = response.data.data;
                setCategoryList(data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    // For category
    const recipeByCategoryChartData = {
        labels: recipeByCategory.map((item) => item.category.name),
        datasets: [
            {
                label: 'Số lượng công thức',
                data: recipeByCategory.map((item) => item.num_recipes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1.5,
            },
        ],
    };

    return (
        <Container className={cx('wrapper')}>
            <div className={cx('title-wrapper')}>
                <h1 className={cx('title')}>
                    Số Liệu thống kê công thức <FontAwesomeIcon icon={faChartSimple} />
                </h1>
            </div>
            <Row>
                <Col sm={6} md={4} lg={3}>
                    <div className={cx('card-item')}>
                        <div className={cx('card-info', 'info')}>
                            <div className={cx('card-title')}>Số công thức</div>
                            <div className={cx('card-number')}>{totalRecipe}</div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon icon={faBowlFood} />
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={4} lg={3}>
                    <div className={cx('card-item', 'warning')}>
                        <div className={cx('card-info')}>
                            <div className={cx('card-title')}>Mới trong năm</div>
                            <div className={cx('card-number')}>{totalRecipeInYear}</div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={4} lg={3}>
                    <div className={cx('card-item', 'danger')}>
                        <div className={cx('card-info')}>
                            <div className={cx('card-title')}>Mới trong tháng</div>
                            <div className={cx('card-number')}>{totalRecipeInMonth}</div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={4} lg={3}>
                    <div className={cx('card-item', 'success')}>
                        <div className={cx('card-info')}>
                            <div className={cx('card-title')}>Số loại công thức</div>
                            <div className={cx('card-number')}>{totalCategory}</div>
                        </div>
                        <div className={cx('card-icon')}>
                            <FontAwesomeIcon icon={faTags} />
                        </div>
                    </div>
                </Col>
            </Row>

            <hr className={cx('break')} />

            <Row>
                <Col xs={12}>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-control')}>
                            <label className={cx('filter-label')} htmlFor="category">
                                Loại:
                            </label>

                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                className={cx('filter-select')}
                                id="category"
                            >
                                <option value="">Tất cả</option>
                                {categoryList.map((category) => (
                                    <option key={category.categoryid} value={category.categoryid}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={cx('filter-control')}>
                            <label className={cx('filter-label')} htmlFor="year">
                                Năm:
                            </label>

                            <select
                                onChange={(e) => setYear(e.target.value)}
                                className={cx('filter-select')}
                                id="year"
                            >
                                <option value={new Date().getFullYear()}>
                                    {new Date().getFullYear()}
                                </option>
                                <option value={new Date().getFullYear() - 1}>
                                    {new Date().getFullYear() - 1}
                                </option>
                                <option value={new Date().getFullYear() - 2}>
                                    {new Date().getFullYear() - 2}
                                </option>
                                <option value={new Date().getFullYear() - 3}>
                                    {new Date().getFullYear() - 3}
                                </option>
                                <option value={new Date().getFullYear() - 4}>
                                    {new Date().getFullYear() - 4}
                                </option>
                            </select>
                        </div>
                    </div>
                </Col>
                <Col md={12} lg={4}>
                    <Doughnut options={options_1} data={recipeByCategoryChartData} />
                </Col>
                <Col md={12} lg={8}>
                    <Bar options={options_2} data={recipeByMonthChartData} />
                </Col>
            </Row>
        </Container>
    );
}

export default StatisticsPage;
