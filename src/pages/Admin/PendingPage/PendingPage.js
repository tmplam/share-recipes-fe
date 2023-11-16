import classNames from 'classnames/bind';

import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './PendingPage.module.scss';
import PendingItem from './components/PendingItem';

const cx = classNames.bind(styles);

const RECIPES_ITEM_PENDING = [
    {
        image: 'https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=6YgYbtr%2bOavtoQ&pid=ImgRaw&r=0',
        name: 'Hamburgur',
        description:
            'Món bánh quy này là sự kết hợp hoàn hảo của ngọt và đắng: ngọt của bơ, đường và ngăm ngăm đắng của từng viên chocolate nhỏ. Còn gì thú vị hơn khi được nhâm nhi món bánh này cùng một tách trà vào một chiều đông lạnh?',
    },
    {
        image: 'https://th.bing.com/th/id/OIP.9hy9vmaBnEr2ufyaXsP1UQHaHa?pid=ImgDet&w=500&h=500&rs=1',
        name: 'Noodle',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập. Hãy thử tưởng tượng có một đĩa gà rang muối nóng hổi bên những chai bia lạnh bên bạn bè thân trong cuối tuần này. Đọc ngay công thức này để chuẩn bị và tag bạn bè vào rủ rê thôi!',
    },
    {
        image: 'https://th.bing.com/th/id/R.09fc02f79025c0ab41021878d475e6eb?rik=v%2fH1ZQGvBCGLng&riu=http%3a%2f%2ffoodology.ca%2fwp-content%2fuploads%2f2019%2f04%2fstarbucks-summer-frappuccino-1-620x930.jpg&ehk=X0PYJDlXsGpJdBxu1KUJ0xOo743Dwt6JLe8PFHRiwXY%3d&risl=&pid=ImgRaw&r=0',
        name: 'Matcha',
        description:
            'Món chè Sago (bột báng) này rất phổ biến ở Singapore và Malaysia bởi hương vị rất “Đông Nam Á” từ nước cốt dừa, lá nếp (lá dứa) và đường thốt nốt. Với nguyên liệu dễ làm, cách làm đơn giản, đây chắc chắn sẽ là món tráng miệng đầy “hương mùa hè” và khiến bạn yêu thích!',
    },
    {
        image: 'https://th.bing.com/th/id/R.b78eeff1d8318e10b5b856987b87128c?rik=5a1xRA5Ps0YXXA&riu=http%3a%2f%2ffoodisafourletterword.com%2fwp-content%2fuploads%2f2020%2f11%2fVietnamese_Chicken_Banh_Mi_Recipe_Banh_Mi_Ga_Roti_new2.jpg&ehk=57vR67zsj1QYi95KKPIdFUstdMy2CVRIGiK0U8sUVbk%3d&risl=&pid=ImgRaw&r=0',
        name: 'Bánh mì',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập. Hãy thử tưởng tượng có một đĩa gà rang muối nóng hổi bên những chai bia lạnh bên bạn bè thân trong cuối tuần này. Đọc ngay công thức này để chuẩn bị và tag bạn bè vào rủ rê thôi!',
    },
    {
        image: 'https://th.bing.com/th/id/R.074d9129be8d236081dbbe9d28e89e8c?rik=e%2fMjesjXDakENg&pid=ImgRaw&r=0',
        name: 'Phở bò',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập.',
    },
    {
        image: 'https://th.bing.com/th/id/OIP.0lM593xkQsYglwZlrzA0AgHaHa?pid=ImgDet&rs=1',
        name: 'Matcha socola',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập.',
    },
    {
        image: 'https://th.bing.com/th/id/OIP.m5nPkqe6S6xp9dhZvrIOdwHaD4?pid=ImgDet&rs=1',
        name: 'Hủ tiếu',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập.',
    },
    {
        image: 'https://th.bing.com/th/id/R.645e9c75227cec18ccc0969e2b40c8d9?rik=mJbvjh63r0Hu2w&riu=http%3a%2f%2fcdn1.vietnamtourism.org.vn%2fimages%2fcom-tam_jpg.jpg&ehk=8uQOKbVC2J77LG2RqFLNmdFA%2fM%2bjX6nCBK4vx07YheA%3d&risl=&pid=ImgRaw&r=0',
        name: 'Cơm sườn',
        description:
            'Gà được tẩm ướp đậm đà, tẩm bột chiên cùng sả và rắc muối thật thơm. Đây là món ăn chẳng thể thiếu trong các buổi tụ tập.',
    },
];

function PendingPage() {
    return (
        <Container className={`${cx('wrapper')}`}>
            <h1 className={cx('title')}>
                <FontAwesomeIcon icon={faListCheck} /> Danh Sách Chờ Duyệt
            </h1>
            <Row className="justify-content-center">
                {RECIPES_ITEM_PENDING.map((recipe, index) => (
                    <Col sm={12} md={12} lg={8} xl={8} xxl={8} key={index}>
                        <PendingItem {...recipe} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PendingPage;
