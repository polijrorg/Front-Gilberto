import React, { useState } from 'react';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';

const EvaluateVisit = () => {
  const navigation = useNavigation();
  const [path, setPath] = useState([
    { name: '1', path: 'MyTeam' },
    { name: '2', path: 'ScreenSequence' },
    { name: '3', path: 'SellerAdded' },
    { name: '4', path: 'SellerAdded' },
    { name: '5', path: 'SellerAdded' },
    { name: '6', path: 'SellerAdded' },
    { name: '7', path: 'SellerAdded' },
  ]);

  const handleNavigation = (index) => {
    const newPath = path.slice(0, index + 1);
    console.log(newPath);
    navigation.navigate(newPath[index].path as never);
    setPath(newPath);
  };

  return (
    <S.WrapperView>
      <S.ContainerFields>
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
        <S.DivContainer>
          <S.TitleInput>Nome do Vendedor</S.TitleInput>
          <S.Input placeholder="Selecionar" />
        </S.DivContainer>

        <S.DivContainer>
          <S.TitleInput>Loja</S.TitleInput>
          <S.Input placeholder="Nome da Loja" />
        </S.DivContainer>
      </S.ContainerFields>
      <S.ButtonIniciar>
        <S.TextBtn>iniciar Avaliação</S.TextBtn>
      </S.ButtonIniciar>
    </S.WrapperView>
  );
};

export default EvaluateVisit;
