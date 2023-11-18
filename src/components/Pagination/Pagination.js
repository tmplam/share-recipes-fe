import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ page, total_page, onPageChange }) {
    let key = 1;
    const pageItems = [];
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;

    // Prev button
    pageItems.push(
        <li
            className={cx('btn', 'prev', { disabled: page === 1 })}
            key={key++}
            onClick={() => {
                onPageChange(page - 1);
            }}
        >
            <span>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
        </li>,
    );

    if (total_page <= 5) {
        for (let i = 1; i <= total_page; i++) {
            pageItems.push(
                <li
                    className={cx('numb', { active: i === page })}
                    key={key++}
                    onClick={() => {
                        onPageChange(i);
                    }}
                >
                    <span>{i}</span>
                </li>,
            );
        }
    } else {
        if (page > 2) {
            pageItems.push(
                <li
                    className={cx('first', 'numb')}
                    key={key++}
                    onClick={() => {
                        onPageChange(1);
                    }}
                >
                    <span>1</span>
                </li>,
            );
            if (page > 3) {
                pageItems.push(
                    <li className={cx('dots')} key={key++}>
                        <span>...</span>
                    </li>,
                );
            }
        }

        // how many pages or li show before the current li
        if (page === total_page) {
            beforePage = beforePage - 2;
        } else if (page === total_page - 1) {
            beforePage = beforePage - 1;
        }
        // how many pages or li show after the current li
        if (page === 1) {
            afterPage = afterPage + 2;
        } else if (page === 2) {
            afterPage = afterPage + 1;
        }

        for (let plength = beforePage; plength <= afterPage; plength++) {
            if (plength > total_page) {
                //if plength is greater than totalPage length then continue
                continue;
            }
            if (plength === 0) {
                //if plength is 0 than add +1 in plength value
                plength = plength + 1;
            }
            if (page === plength) {
                //if page is equal to plength than assign active string in the active variable
                active = true;
            } else {
                //else leave empty to the active variable
                active = false;
            }
            pageItems.push(
                <li
                    className={cx('numb', { active })}
                    key={key++}
                    onClick={() => {
                        onPageChange(plength);
                    }}
                >
                    <span>{plength}</span>
                </li>,
            );
        }

        if (page < total_page - 1) {
            //if page value is less than totalPage value by -1 then show the last li or page
            if (page < total_page - 2) {
                //if page value is less than totalPage value by -2 then add this (...) before the last li or page
                pageItems.push(
                    <li className={cx('dots')} key={key++}>
                        <span>...</span>
                    </li>,
                );
            }

            pageItems.push(
                <li
                    className={cx('last', 'numb')}
                    key={key++}
                    onClick={() => {
                        onPageChange(total_page);
                    }}
                >
                    <span>{total_page}</span>
                </li>,
            );
        }
    }

    // Next button
    pageItems.push(
        <li
            className={cx('btn', 'next', { disabled: page === total_page })}
            key={key++}
            onClick={() => {
                onPageChange(page + 1);
            }}
        >
            <span>
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
        </li>,
    );

    return (
        <div className={cx('pagination')}>
            <ul>{pageItems}</ul>
        </div>
    );
}

export default Pagination;
