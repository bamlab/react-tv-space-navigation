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
import chunk from 'lodash/chunk';
import { ProgramInfo } from '../modules/program/domain/programInfo';
import { theme } from '../design-system/theme/theme';

const ROW_SIZE = 7;

const renderProgramsList = (programsList: ProgramInfo[]) => <ProgramRow programs={programsList} />;

export const NonVirtualizedGridPage = () => {
  const programsLists = chunk(getPrograms(), ROW_SIZE);
  return (
    <Page>
      <Container>
        <SpatialNavigationNode alignInGrid>
          <DefaultFocus>{programsLists.map(renderProgramsList)}</DefaultFocus>
        </SpatialNavigationNode>
      </Container>
    </Page>
  );
};

const ProgramRow = ({ programs }: { programs: ProgramInfo[] }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
  backgroundColor: theme.colors.background.mainHover,
  margin: 'auto',
  borderRadius: scaledPixels(20),
  padding: scaledPixels(30),
  alignItems: 'flex-start',
});
