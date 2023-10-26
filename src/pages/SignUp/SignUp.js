import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';


const cx = classNames.bind(styles);



function SignUp() {
    return (
       
        <div className={cx('container')}>
            <div className={cx('picture')}></div>
            <div className={cx('form')}>
                <form action="">
                    <h1>Sign Up</h1>
                    <div className={cx('input-box')}>
                        <input type="text" placeholder="Username" required /> 
                        {/* <i className={cx('fa-solid fa-user')}></i> */}
                    </div>
                    <div className={cx('input-box')}>
                        <input type="password" placeholder="Password" required />
                        {/* <i className={cx('fa-solid fa-key')}></i> */}
                    </div>
                    <div className={cx('input-box')}>
                        <input type="password" placeholder="Retype" required />
                        {/* <i className={cx('fa-solid fa-key')}></i> */}
                    </div>
                    <div className={cx('input-box')}>
                        <input type="email" placeholder="Email (Optional)"  />
                        {/* <i className={cx('fa-solid fa-key')}></i> */}
                    </div>
                    <div className={cx('input-box')}>
                        <input type="text" placeholder="Phone Number (Optional)"  />
                        {/* <i className={cx('fa-solid fa-key')}></i> */}
                    </div>
                    <button className={cx('btn')} type="submit" >Đăng Ký</button>
                    <div className={cx('log-in')}>
                        <p>Bạn đã có tài khoản ?</p>
                    <a href = "#" class = "sign-in__link"><p>Đăng nhập</p></a>
                </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
