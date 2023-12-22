import classNames from 'classnames/bind';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlateWheat, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

import styles from './PendingDetailPage.module.scss';

import useAuth from '~/hooks/useAuth';
import axios from '~/utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function PendingDetailPage() {
    const { auth } = useAuth();
    let { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        axios
            .get(`recipes/${recipeId}`, {
                headers: {
                    Authorization: auth?.token === 'EXPIRED' ? null : auth?.token,
                },
            })
            .then((response) => {
                setRecipe(response?.data.data);
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="mb-4">
            <div className={cx('wrapper')}>
                <div className={cx('recipe-info')}>
                    <h1 className={cx('name')}>{recipe.name}</h1>
                    <div className={cx('detail')}>
                        <div className={cx('desc')}>
                            <img
                                className={`${cx('food-img')} img-thumbnail`}
                                src={recipe.recipeavatar}
                                alt="anh"
                            />
                            <div className={cx('desc-detail')}>
                                <div>
                                    <h2 className={cx('title')}>
                                        <FontAwesomeIcon icon={faNewspaper} /> Mô tả:
                                    </h2>
                                    <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>
                                        <strong style={{ fontWeight: 600, fontSize: 2.2 + 'rem' }}>
                                            Loại:{' '}
                                        </strong>{' '}
                                        {recipe.category}
                                    </p>
                                    <p>
                                        <strong style={{ fontWeight: 600, fontSize: 1.8 + 'rem' }}>
                                            Thời gian:{' '}
                                        </strong>{' '}
                                        {recipe.estimatedtime} phút
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('ingre-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faPlateWheat} /> Nguyên liệu:
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }} />
                        </div>
                        <div className={cx('guid-wrapper')}>
                            <h2 className={cx('title')}>
                                <FontAwesomeIcon icon={faUtensils} /> Hướng dẫn:
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: recipe.instruction }} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default PendingDetailPage;
