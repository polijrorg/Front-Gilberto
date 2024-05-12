import React from 'react';
import { ActivityIndicator } from 'react-native';
import Card from '@components/Cards';
import * as S from './styles';
import ISeller from '@interfaces/Seller';
import ISupervisor from '@interfaces/Supervisor';

const Container: React.FC<{
  search?: string;
  data: Array<ISeller | ISupervisor>;
  loading: boolean;
  title: string;
  media?: { [key: string]: number };
}> = ({ search, data, loading, title, media = {} }) => {
  let filteredData: Array<ISeller | ISupervisor> = data;

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  if (search) {
    const searchTerm = removeAccents(search.toLowerCase());
    filteredData = data.filter((item) =>
      removeAccents(item.name.toLowerCase()).includes(searchTerm)
    );
  }
  // Verificar se o item é um supervisor antes de aplicar o filtro de média
  if (media && filteredData.some((item) => 'supervisorId' in item)) {
    filteredData = filteredData.filter((item) => media[item.id] !== undefined);
    filteredData.sort((a, b) => (media[b.id] || 0) - (media[a.id] || 0));
  }

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title}</S.TitleSlider>
      <S.Cards>
        {loading ? (
          <LoadingIndicator />
        ) : filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <CardItem key={index} item={item} media={media} />
          ))
        ) : (
          <NoDataMessage title={title} />
        )}
      </S.Cards>
    </S.DivWrapper>
  );
};

const LoadingIndicator: React.FC = () => (
  <S.CenteredView>
    <ActivityIndicator size="large" color="#0000ff" />
  </S.CenteredView>
);

const NoDataMessage: React.FC<{ title: string }> = ({ title }) => (
  <S.CenteredView>
    <S.TitleSellers>Não há {title.toLowerCase()} cadastrados</S.TitleSellers>
  </S.CenteredView>
);

const CardItem: React.FC<{
  item: ISeller | ISupervisor;
  media: { [key: string]: number };
}> = ({ item, media }) => {
  const fullName = item.name || 'Usuário';
  const nameParts = fullName.split(' ');
  let displayName = '';
  if (nameParts.length > 1) {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    displayName = `${firstName} ${lastName}`;
  } else {
    displayName = fullName;
  }
  const sellerMedia = media[item.id] || 0;

  return (
    <Card
      id={item.id}
      nome={displayName}
      cargo={item.job}
      companyId={item.companyId}
      nota={sellerMedia || 0}
    />
  );
};

export default Container;
