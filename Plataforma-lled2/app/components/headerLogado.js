import styles from '../components/header.module.css'; 

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
           src="/img/logo3.png" 
          alt="Logo"
          width={120} 
          height={50} 
        />
      </div>
    </header>
  );
}