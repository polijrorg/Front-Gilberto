import React from 'react';
import * as S from './styles';

interface BreadcrumbProps {
  size: number;
  handleNavigation: (index: number) => void;
  selected: number;
  style?: object; // Adicionando a propriedade de estilo ao BreadcrumbProps
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  size,
  handleNavigation,
  selected,
  style,
}) => {
  return (
    <S.Container style={style}>
      {Array.from({ length: size }).map((_, index) => (
        <S.ItemContainer key={index}>
          <S.Button
            onPress={() => handleNavigation(index + 1)}
            Selected={
              index + 2 === selected
                ? 'selected'
                : index + 2 <= selected
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
