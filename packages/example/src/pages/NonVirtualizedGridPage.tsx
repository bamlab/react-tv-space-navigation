import {
  DefaultFocus,
  SpatialNavigationScrollView,
  SpatialNavigationView,
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
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import { StyleSheet } from 'react-native';

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
          <SpatialNavigationScrollView
            offsetFromStart={HEADER_SIZE + 20}
            descendingArrow={<TopArrow />}
            ascendingArrow={<BottomArrow />}
            descendingArrowContainerStyle={styles.topArrowContainer}
            ascendingArrowContainerStyle={styles.bottomArrowContainer}
          >
            <Header
              title="Example of a non-virtualized grid with spatial navigation"
              description="The grid shown on this page is NOT virtualized, which means that when scrolling, the elements not shown in the screen ARE rendered."
              verticalSize={HEADER_SIZE}
            />
            <SpatialNavigationView alignInGrid direction="vertical">
              <DefaultFocus>{programsLists.map(renderProgramsList)}</DefaultFocus>
            </SpatialNavigationView>
          </SpatialNavigationScrollView>
        </GridContainer>
      </CenteringView>
    </Page>
  );
};

const ProgramRow = ({ programs }: { programs: ProgramInfo[] }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ListContainer direction="horizontal">
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
  );
};

const ListContainer = styled(SpatialNavigationView)(({ theme }) => ({
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

const styles = StyleSheet.create({
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -15,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
});
