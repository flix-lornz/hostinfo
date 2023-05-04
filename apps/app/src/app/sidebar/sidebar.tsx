import { CSSProperties } from 'react';
import styles from './sidebar.module.scss';

import classNames from 'classnames';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import hostLogo from 'libs/icons/host-logo.svg';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import deLogo from 'libs/icons/de.png';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import gbLogo from 'libs/icons/gb.png';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import qrCode from 'libs/icons/qrCode.png';

export interface SidebarProps {
  className?: string; //? - optional
  id?: string;
  style?: CSSProperties;
}
//className={classNames(styles['qrCode'], className)}
export function Sidebar({ className, id, style }: SidebarProps) {
  return (
    <div style={style} className={classNames(styles['container'], className)}>
      <img
        id={classNames(styles['hostLogo'], id)}
        src={hostLogo}
        alt="hostLogo"
      ></img>

      <div className={classNames(styles['langIcons'], className)}></div>
      <img
        style={style}
        className={classNames(styles['langIcons'], className)}
        src={deLogo}
        alt="deLogo"
      ></img>
      <img
        style={style}
        className={classNames(styles['langIcons'], className)}
        src={gbLogo}
        alt="gbLogo"
      ></img>
      <div>Choose Language</div>

      <img id={styles['qrCode']} src={qrCode} alt="qrCode"></img>
      <div>Scan Me!</div>
    </div>
  );
}

export default Sidebar;
