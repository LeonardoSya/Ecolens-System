import { Typography } from 'antd';
import styles from './warning.module.css'

const Warning = () => {
    return (
        <div className={styles.body}>
            <Typography.Title level={2} className={styles.text} style={{color:'#262626'}}>请将手机横屏<br />以获得最佳体验</Typography.Title>
        </div>
    )
};

export default Warning;