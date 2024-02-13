import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { View } from 'react-native';
import ISeller from '@interfaces/Seller';

type IVendedor = {
  sellers: ISeller;
};

const HeaderSalesInspector: React.FC<IVendedor> = ({ sellers }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [seller, setSeller] = useState<ISeller>();

  useEffect(() => {
    const sellerData = async () => {
      try {
        setSeller(sellers as ISeller);
        console.log(seller);
      } catch (error) {
        console.error('Erro ao buscar vendedores:', error);
      }
    };

    sellerData();
  }, [seller, sellers]);

  const handlePress = (item) => {
    setSelectedItem(item);
  };

  return (
    <View>
      <S.Wrapper>
        <S.ViewInfoUser>
          <S.ImageUser source={require('@assets/img/cardVendedor/foto.png')} />
          <S.InfoUser>
            <S.Title>{seller.name}</S.Title>
            <S.Loja>{'Loja'}</S.Loja>
            <S.Funcao>{'Função'}</S.Funcao>
          </S.InfoUser>
          <S.BtnLixeira>
            <S.ImageVectorLixeira source={require('@assets/img/lixeira.png')} />
          </S.BtnLixeira>
        </S.ViewInfoUser>
        <S.Menu>
          <S.ButtonItem
            isSelected={selectedItem === 'mentoria'}
            onPress={() => handlePress('mentoria')}
          >
            <S.TextItem>Mentoria</S.TextItem>
          </S.ButtonItem>

          <S.ButtonItem
            isSelected={selectedItem === 'visita'}
            onPress={() => handlePress('visita')}
          >
            <S.TextItem>Visita</S.TextItem>
          </S.ButtonItem>

          <S.ButtonItem
            isSelected={selectedItem === 'planos'}
            onPress={() => handlePress('planos')}
          >
            <S.TextItem>Planos de ação</S.TextItem>
          </S.ButtonItem>
        </S.Menu>
      </S.Wrapper>
    </View>
  );
};

export default HeaderSalesInspector;
