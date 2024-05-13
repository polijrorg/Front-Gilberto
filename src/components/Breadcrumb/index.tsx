import React from 'react';
import * as S from './styles';

interface BreadcrumbProps {
  size: number;
  handleNavigation: (index: number) => void;
  selected: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  size,
  handleNavigation,
  selected,
}) => {
  return (
    <S.Container>
      {Array.from({ length: size }).map((_, index) => (
        <S.ItemContainer key={index}>
          <S.Button
            onPress={() => handleNavigation(index + 1)}
            Selected={
              index + 1 === selected
                ? 'selected'
                : index + 1 <= selected
                  ? 'check'
                  : 'false'
            }
          >
            <S.Crumb>{index + 1}</S.Crumb>
          </S.Button>

          {index !== size - 1 && <S.Separator>{'>'}</S.Separator>}
        </S.ItemContainer>
      ))}
    </S.Container>
  );
};

export default Breadcrumb;
