import { DefaultFocus, SpatialNavigationNode } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import '../components/configureRemoteControl';
import { getPrograms } from '../modules/program/infra/programInfos';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styled from '@emotion/native';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { ProgramNode } from '../modules/program/view/ProgramNode';

export const NonVirtualizedGridPage = () => {
  return (
    <Page>
      <Container>
        <SpatialNavigationNode alignInGrid>
          <DefaultFocus>
            <ShortProgramList />
            <ShortProgramList />
            <ShortProgramList />
          </DefaultFocus>
        </SpatialNavigationNode>
      </Container>
    </Page>
  );
};

const ShortProgramList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const programs = getPrograms().slice(0, 6);
  return (
    <SpatialNavigationNode orientation="horizontal">
      <ListContainer>
        {programs.map((program) => {
          return (
            <ProgramNode
              programInfo={program}
              onSelect={() => navigation.push('ProgramDetail', { programInfo: program })}
              key={program.id}
            />
          );
        })}
      </ListContainer>
    </SpatialNavigationNode>
  );
};

const ListContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacings.$4,
  padding: theme.spacings.$4,
}));

const Container = styled.View({
  backgroundColor: '#222',
  margin: 'auto',
  borderRadius: scaledPixels(20),
  padding: scaledPixels(30),
  justifyContent: 'center',
  alignItems: 'center',
});
