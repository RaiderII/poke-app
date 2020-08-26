import BurgerStyle from '../styled-components/Burger/BurgerStyle';

interface Props {
  openMenu: boolean;
  turnMenu: Function;
  turnSearch?: any;
}

export default function Burger({ openMenu, turnMenu, turnSearch }: Props) {
  return (
    <BurgerStyle
      openMenu={openMenu}
      onClick={() => {
        turnMenu(!openMenu);
      }}
    >
      <div />
      <div />
      <div />
    </BurgerStyle>
  );
}
