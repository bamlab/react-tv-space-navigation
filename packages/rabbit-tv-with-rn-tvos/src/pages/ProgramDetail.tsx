import styled from '@emotion/native';
import { DefaultFocus, SpatialNavigationNode } from 'react-native-tv-spatial-navigation/src';
import { Page } from '../components/atom/Page';
import { ProgramList } from '../components/organisms/ProgramList';
import { useRabbitImageSource } from '../components/useRabbitImageSource';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';

export const ProgramDetail = () => {
  const imageSource = useRabbitImageSource();

  return (
    <Page>
      <Box paddingHorizontal="$15" paddingTop="$10" direction="horizontal">
        <DefaultFocus>
          <SpatialNavigationNode isFocusable>
            {({ isFocused }) => (
              <JumbotronContainer isFocused={isFocused}>
                <Jumbotron source={imageSource} />
              </JumbotronContainer>
            )}
          </SpatialNavigationNode>
        </DefaultFocus>
        <Box padding="$15" flex={1}>
          <Typography variant="title" fontWeight="strong">
            Jojo Rabbit
          </Typography>
          <Spacer gap="$15" />
          <Description variant="body" fontWeight="strong">
            En Allemagne, durant les derniers mois de la Seconde Guerre mondiale, Johannes « Jojo »
            Betzler, âgé de 10 ans, est maltraité par ses camarades alors qu&apos;il participe à un
            camp des jeunesses hitlériennes (Deutsches Jungvolk). Incapable de tuer un lapin (rabbit
            en anglais), il est traité de lâche et surnommé Jojo Rabbit. Il se console avec son ami
            imaginaire, Adolf Hitler. Amoureux de la « nation » et grand partisan du Führer, il voit
            sa vie remise en cause lorsqu&apos;il découvre que sa mère cache une jeune Juive dans le
            grenier de leur maison2.
          </Description>
        </Box>
      </Box>
      <Spacer gap="$5" />
      <ProgramList title="You may also like..." numberOfItems={10}></ProgramList>
    </Page>
  );
};

const JumbotronContainer = styled.View<{ isFocused: boolean }>(({ isFocused }) => ({
  width: '60%',
  overflow: 'hidden',
  borderRadius: 20,
  borderWidth: 3,
  borderColor: isFocused ? 'white' : 'transparent',
}));

const Jumbotron = styled.Image({
  width: '100%',
  resizeMode: 'cover',
});

const Description = styled(Typography)({
  textAlign: 'justify',
});
