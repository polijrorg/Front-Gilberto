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
  userType?: string;
}> = ({ search, data, loading, title, media = {}, userType }) => {
  let filteredData: Array<ISeller | ISupervisor> = data;

  const filterData = () => {
    if (userType !== 'Supervisor') {
      const removeAccents = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

      const searchTerm = search ? removeAccents(search.toLowerCase()) : '';

      filteredData = data.filter((item) => {
        const itemName = removeAccents(item.name.toLowerCase());
        return !search || itemName.includes(searchTerm);
      });
    }
  };

  filterData();

  return (
    <S.DivWrapper>
      <S.TitleSlider>{title}</S.TitleSlider>
      <S.Cards>
        {loading ? (
          <LoadingIndicator />
        ) : filteredData.length > 0 ? (
          userType === 'Supervisor' ? (
            <>
              <S.DivVisita>
                <S.TitleSection>Visita</S.TitleSection>
                {filteredData
                  .filter((item): item is ISeller => 'stage' in item && item.stage === 'Visita')
                  .map((item, index) => (
                    <CardItem key={index} item={item} media={media} />
                  ))}
              </S.DivVisita>
              <S.DivMentoria>
                <S.TitleSection>Mentoria</S.TitleSection>
                {filteredData
                  .filter((item): item is ISeller => 'stage' in item && item.stage === 'Mentoria')
                  .map((item, index) => (
                    <CardItem key={index} item={item} media={media} />
                  ))}
              </S.DivMentoria>
            </>
          ) : (
            filteredData.map((item, index) => (
              <CardItem key={index} item={item} media={media} />
            ))
          )
        ) : (
          <NoDataMessage title={userType === 'Supervisor' ? 'Visita' : 'Dados'} />
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
  const isSeller = 'stage' in item;

  return (
    <Card
      id={item.id}
      nome={displayName}
      stage={isSeller ? (item as ISeller).stage : 'Pendente'}
      cargo={item.job}
      companyId={item.companyId}
      nota={sellerMedia || 0}
    />
  );
};

export default Container;
