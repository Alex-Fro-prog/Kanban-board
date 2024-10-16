import styles from './ModuleCSS/Footer.module.css';

interface FooterProps {
  backlogCount: number;
  finishedCount: number;
}

const Footer: React.FC<FooterProps> = ({ backlogCount, finishedCount }) => (
  <footer className={styles.footer}>
    <div className={styles.tasksContainer}>
      <p className={styles.activeTask}>Active tasks: {backlogCount}</p>
      <p className={styles.finishedTask}>Finished tasks: {finishedCount}</p>
    </div>
    <div>
      <p className={styles.footerInfo}>Kanban board by Name, YEAR</p>
    </div>
  </footer>
);

export default Footer;