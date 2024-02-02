import {
  DefaultFocus,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
} from 'react-tv-space-navigation';
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
import { Header } from '../modules/header/view/Header';

const ROW_SIZE = 7;
const HEADER_SIZE = scaledPixels(400);

const renderProgramsList = (programsList: ProgramInfo[]) => (
  <ProgramRow programs={programsList} key={programsList[0].id} />
);

export const NonVirtualizedGridPage = () => {
  const programsLists = chunk(getPrograms(), ROW_SIZE);
  return (
    <Page>
      <CenteringView>
        <GridContainer>
          <SpatialNavigationScrollView offsetFromStart={HEADER_SIZE + 20}>
            <Header
              title="Rabbit Movies"
              description="Delve into the delightful world of Rabbit Movies, where every film celebrates the charm and whimsy of our favorite fluffy friends. This category is a haven for rabbit lovers, featuring animated escapades and heartwarming family stories starring these adorable creatures."
              verticalSize={HEADER_SIZE}
            />
            <SpatialNavigationNode alignInGrid>
              <DefaultFocus>{programsLists.map(renderProgramsList)}</DefaultFocus>
            </SpatialNavigationNode>
          </SpatialNavigationScrollView>
        </GridContainer>
      </CenteringView>
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
  gap: theme.spacings.$4,
  padding: theme.spacings.$4,
}));

const GridContainer = styled.View({
  backgroundColor: theme.colors.background.mainHover,
  margin: 'auto',
  height: '95%',
  width: '88%',
  borderRadius: scaledPixels(20),
  padding: scaledPixels(30),
});

const CenteringView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
