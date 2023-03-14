import styles from './spinner.module.scss';

export const Spinner = ({ className }) => {
  const jointClassName = className ? `${styles.spinner} ${className}` : styles.spinner;
  return <div className={jointClassName}></div>;
};
