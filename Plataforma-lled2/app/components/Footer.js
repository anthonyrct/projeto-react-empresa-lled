import styles from './footer.module.css';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
              <p>Email: exemplo@dominio.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </div>
            <div className={styles.footerRight}>
              <Image
                src="/img/logo4.png"
                alt="Logo"
                width={300} // Ajuste o tamanho conforme necessário
                height={110} // Ajuste o tamanho conforme necessário
              />
            </div>
          </footer>
    );
}