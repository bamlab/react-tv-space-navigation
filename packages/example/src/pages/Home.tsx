import { AboutSubPage } from './AboutSubPage';
import { CreditsSubPage } from './CreditsSubPage';
import { ProfileSubPage } from './ProfilSubPage';
import styled from '@emotion/native';
import { DefaultFocus, SpatialNavigationView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import { Typography } from '../design-system/components/Typography';
import { Button } from '../design-system/components/Button';
import { useState } from 'react';

export const Home = () => {
  const [page, goToSubPage] = useState<'about' | 'credits' | 'profile'>('about');

  return (
    <Page>
      <TitleContainer>
        <Title variant="title">Hoppix</Title>
      </TitleContainer>
      <DefaultFocus>
        <SpatialNavigationView direction="horizontal">
          <SpatialNavigationView direction="vertical">
            <Button onSelect={() => goToSubPage('about')} label="About" />
            <Button onSelect={() => goToSubPage('credits')} label="Credits" />
            <Button onSelect={() => goToSubPage('profile')} label="Profile" />
          </SpatialNavigationView>
          <SpatialNavigationView direction="vertical">
            {page === 'about' && <AboutSubPage />}
            {page === 'credits' && <CreditsSubPage />}
            {page === 'profile' && <ProfileSubPage />}
          </SpatialNavigationView>
        </SpatialNavigationView>
      </DefaultFocus>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$4 }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));
