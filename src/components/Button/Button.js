import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    center,
    primary,
    green,
    dark,
    outline,
    w100,
    inactive,
    rounded,
    disabled,
    small,
    large,
    ml,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        center,
        primary,
        green,
        dark,
        outline,
        w100,
        inactive,
        rounded,
        disabled,
        small,
        large,
        ml,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', 'left')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon', 'right')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
