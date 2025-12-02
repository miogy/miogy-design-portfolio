// import styles from "./Footer.module.css";

// export default function Footer() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.banner}>PORTFOLIO</div>
//       <div className={styles.bottom}>
//         <span>© 2025 양미옥</span>
//         <a 
//         href="mailto:jjangrl87@gmail.com?subject=Miogy%20Portfolio%20Inquiry"
//         ><span>jjangrl87@gmail.com</span>
//         </a>
//       </div>
//     </footer>
//   );
// }

// app/components/Footer.tsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerWrap}>
      {/* 큰 배너 영역 */}
      <div className={styles.banner}>PORTFOLIO</div>

      {/* 이메일 영역 */}
      <div className={`${styles.email} ${styles.footerBottom}`}>
        <small>© 2025. 양미옥</small>
        <small>
          <a href="mailto:jjangrl87@gmail.com?subject=Miogy%20Portfolio%20Inquiry"
          >jjangrl87@gmail.com</a>
        </small>
      </div>
    </footer>
  );
}
