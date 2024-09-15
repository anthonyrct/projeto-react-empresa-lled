    import styles from './header.module.css';

    export default function Header() {
    return (
        <>
        <header className={styles.header}>
            <div className={styles.logoContainer}>
            <div className={styles.buttons}>
            <a href="/login" className={styles.button}>Login</a>
            <a href="/register" className={styles.button}>Cadastro</a>
            </div>
            </div>
        </header>
        </>
    );
    }