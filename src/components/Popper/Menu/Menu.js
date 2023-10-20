import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false }) {
    const renderItems = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>
                    {items.map((item, index) => {
                        return <MenuItem key={index} data={item} />;
                    })}
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            interactive
            delay={[0, 50]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderItems}
            arrow={true}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
