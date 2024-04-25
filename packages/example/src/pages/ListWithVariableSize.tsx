import styled from '@emotion/native';
import { Page } from '../components/Page';
import { programInfos } from '../modules/program/infra/programInfos';
import { SpatialNavigationView } from '../../../lib/src/spatial-navigation/components/View';
import { scaledPixels } from '../design-system/helpers/scaledPixels';
import { DefaultFocus } from '../../../lib/src/spatial-navigation/context/DefaultFocusContext';
import { SpatialNavigationNode } from '../../../lib/src/spatial-navigation/components/Node';
import { Spacer } from '../design-system/components/Spacer';
import { Button } from '../design-system/components/Button';
import { useState } from 'react';
import { ProgramList } from '../modules/program/view/ProgramList';
import { useTheme } from '@emotion/react';

const ROW_PADDING = scaledPixels(70);

export const ListWithVariableSize = () => {
  const theme = useTheme();
  const [programs, setPrograms] = useState(programInfos.slice(0, 4));

  const addOrRemoveLastItem = () => {
    if (programs.length === 4) {
      setPrograms(programInfos.slice(0, 3));
    } else {
      setPrograms(programInfos.slice(0, 4));
    }
  };

  return (
    <Page>
      <DefaultFocus>
        <Container>
          <SpatialNavigationNode orientation="horizontal">
            <ListContainer>
              <ProgramList
                data={programs}
                listRef={null}
                containerStyle={{ height: theme.sizes.program.portrait.height + ROW_PADDING }}
              />
            </ListContainer>
          </SpatialNavigationNode>
          <Spacer gap="$6" />
          <SpatialNavigationView direction="vertical">
            <Button label="Add/Remove last item" onSelect={addOrRemoveLastItem} />
          </SpatialNavigationView>
        </Container>
      </DefaultFocus>
    </Page>
  );
};

const Container = styled.View({
  flex: 1,
  padding: scaledPixels(30),
});

const ListContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacings.$4,
  padding: theme.spacings.$4,
}));
