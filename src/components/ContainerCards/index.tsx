import React from 'react';
import { ActivityIndicator } from 'react-native';
import Card from '@components/Cards';
import * as S from './styles';
import ISeller from '@interfaces/Seller';
import ISupervisor from '@interfaces/Supervisor';
import User from '@interfaces/User';

const Container: React.FC<{
  search?: string;
  data: Array<ISeller | ISupervisor> | null;
  loading: boolean;
  title: string;
  media?: { [key: string]: number };
  userType?: string;
  userLogged: User
}> = ({ search, data, loading, title, media = {}, userType, userLogged }) => {
  const filteredData = filterData(data, search, userType);

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title}</S.TitleSlider>
      <S.Cards>
        {loading ? (
          <LoadingIndicator />
        ) : (filteredData ?? []).length > 0 ? (
          userType === 'Supervisor' ? (
            <>
              <S.DivVisita>
                <S.TitleSection>Visita</S.TitleSection>
                {renderFilteredData(filteredData, 'Visita', media, userLogged)}
              </S.DivVisita>
              <S.DivMentoria>
                <S.TitleSection>Mentoria</S.TitleSection>
                {renderFilteredData(filteredData, 'Mentoria', media, userLogged)}
              </S.DivMentoria>
            </>
          ) : (
            filteredData?.map(
              (
                item: ISeller | ISupervisor,
                index: string | number | null | undefined
              ) => <CardItem key={index} item={item} media={media} userLogged={userLogged} />
            )
          )
        ) : (
          <NoDataMessage title={userType === 'Supervisor' ? '' : 'Dados'} />
        )}
      </S.Cards>
    </S.DivWrapper>
  );
};

const filterData = (
  data: any[] | null,
  search: string | undefined,
  userType: string | undefined
) => {
  if (userType === 'Supervisor') return data;

  const removeAccents = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const searchTerm = search ? removeAccents(search.toLowerCase()) : '';

  return data?.filter((item) => {
    const itemName = removeAccents(item.name.toLowerCase());
    return !search || itemName.includes(searchTerm);
  });
};

const renderFilteredData = (
  data: any[] | null | undefined,
  stage: string,
  media: { [x: string]: number },
  userLogged: User
) => {
  const filtered = data?.filter(
    (item: { stage: any }): item is ISeller =>
      'stage' in item && item.stage === stage
  );

  if (filtered?.length === 0) {
    return <NoDataMessage key="no-data" title={stage} />;
  }

  return filtered?.map(
    (
      item: ISeller | ISupervisor,
      index: string | number | null | undefined
    ) => <CardItem key={index} item={item} media={media} userLogged={userLogged} />
  );
};

const LoadingIndicator: React.FC = () => (
  <S.CenteredView>
    <ActivityIndicator color="#0000ff" />
  </S.CenteredView>
);

const NoDataMessage: React.FC<{ title: string }> = ({ title }) => (
  <S.CenteredView>
    <S.TitleSellers>
      Não há vendedores no estágio {title.toLowerCase()} cadastrados
    </S.TitleSellers>
  </S.CenteredView>
);

const CardItem: React.FC<{
  item: ISeller | ISupervisor;
  media: { [key: string]: number };
  userLogged: User;
}> = ({ item, media, userLogged }) => {
  const fullName = item.name || 'Usuário';
  const nameParts = fullName.split(' ');
  const displayName =
    nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
      : fullName;
  const sellerMedia = media[item.id] || 0;
  const isSeller = 'stage' in item;

  return (
    <Card
      id={item.id}
      nome={displayName}
      stage={isSeller ? (item as ISeller).stage : 'Pendente'}
      cargo={item.job}
      companyId={item.companyId}
      nota={sellerMedia}
      userLogged={userLogged}
    />
  );
};

export default Container;
