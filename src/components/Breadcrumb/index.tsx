import React from 'react';
import * as S from './styles';

interface BreadcrumbProps {
  path: { name: string; path: string }[];
  handleNavigation: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, handleNavigation }) => {
  return (
    <S.Container>
      {path.map((screen, index) => (
        <S.ItemContainer key={index}>
          <S.Button onPress={() => handleNavigation(index)}>
            <S.Crumb>{screen.name}</S.Crumb>
          </S.Button>
          {index !== path.length - 1 && <S.Separator>{'>'}</S.Separator>}
        </S.ItemContainer>
      ))}
    </S.Container>
  );
};

export default Breadcrumb;
