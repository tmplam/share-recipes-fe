import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';


const cx = classNames.bind(styles);



function Login() {
    return (
       
        <div className={cx('container')}>
            <div className={cx('picture')}></div>
            <div className={cx('form')}>
                <form action="">
                    <h1>Login</h1>
                    <div className={cx('input-box')}>
                        <input type="text" placeholder="Username" required /> 
                        {/* <i className={cx('fa-solid fa-user')}></i> */}
                    </div>
                    <div className={cx('input-box')}>
                        <input type="password" placeholder="Password" required />
                        {/* <i className={cx('fa-solid fa-key')}></i> */}
                    </div>
                    <button className={cx('btn')} type="submit" >Đăng nhập</button>
                    <div className={cx('sign-up')}>
                        <a className={cx('sign-up__link')} href="SignUp.html">Đăng ký</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
