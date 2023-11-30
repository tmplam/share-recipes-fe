import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const options_1 = {
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Công Thức Theo loại',
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
            text: 'Thống Kê Công Thức Từng Tháng Năm 2023',
            color: '#666',
            font: {
                weight: 'bold',
                size: 24,
            },
        },
    },
};

const recipeChartData = {
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
            data: [65, 59, 80, 81, 56, 55, 40, 23, 22, 40, 30, 12],
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

function StatisticsPage() {
    const [categoryList, setCategoryList] = useState([]);
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
    const categoryChartData = {
        labels: categoryList.map((category) => category.name),
        datasets: [
            {
                label: 'Số lượng công thức',
                data: [1, 2, 3, 4, 5],
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
            <h1 className={cx('title')}>Số Liệu Thống Kê</h1>
            <Row>
                <Col xs={12}>
                    <div className={cx('filter-control')}>
                        <label className={cx('filter-label')} htmlFor="year">
                            Năm:
                        </label>

                        <select className={cx('filter-select')} id="year">
                            <option value="all">2023</option>
                            <option value="all">2022</option>
                            <option value="all">2021</option>
                            <option value="all">2020</option>
                            <option value="all">2019</option>
                        </select>
                    </div>
                </Col>
                <Col md={12} lg={4}>
                    <Doughnut options={options_1} data={categoryChartData} />
                </Col>
                <Col md={12} lg={8}>
                    <Bar options={options_2} data={recipeChartData} />
                </Col>
            </Row>
        </Container>
    );
}

export default StatisticsPage;
