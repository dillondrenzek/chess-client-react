import { BoardStage } from "./app/BoardStage";
import { useChessState } from "./hooks/use-chess-state";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import {
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Chip,
  Code,
  Container,
  Grid,
  Group,
  MantineProvider,
  Paper,
  Progress,
  Stack,
  Switch,
  Title,
  Typography,
} from "@mantine/core";
import { SquareColor } from "./lib/chess-types";
import { useAppContext } from "./lib/app-context";

const BOARD_HEIGHT = 500;
const BOARD_WIDTH = 500;

function App() {
  // const fenString = new URL(window.location.href).searchParams.get("fen");
  const { debugMode, setDebugMode } = useAppContext();
  const {
    pieces,
    capturedPieces,
    movePieceToSquare,
    ascii,
    moves,
    turn,
    fen,
    isCheck,
    isCheckmate,
    isGameOver,
    reset,
  } = useChessState();

  return (
    <MantineProvider>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
        }}
      >
        <AppShell.Header>
          <Center h="100%" w="100%">
            <Group px="md" justify="space-between" w="100%">
              <Title order={2} p={0}>
                Chess Client
              </Title>
              <Switch
                label="Debug mode"
                checked={debugMode}
                onChange={(event) => setDebugMode(event.target.checked)}
              />
            </Group>
          </Center>
        </AppShell.Header>

        <AppShell.Main>
          <BoardStage
            height={BOARD_HEIGHT}
            width={BOARD_WIDTH}
            pieces={pieces}
            movePieceToSquare={movePieceToSquare}
          />
        </AppShell.Main>

        {debugMode && (
          <AppShell.Aside>
            <Group p="md">
              <Stack>
                <Code>
                  <pre>{fen}</pre>
                </Code>
                <Code>
                  <pre>{ascii}</pre>
                </Code>
                <Typography>{capturedPieces.length} captured pieces</Typography>
                <Group>
                  <p>
                    {moves.length} moves for{" "}
                    {turn === "b" ? (
                      <Badge color="dark">Black</Badge>
                    ) : (
                      <Badge color="gray">White</Badge>
                    )}
                  </p>
                  {isCheckmate ? <Badge color="green">Checkmate</Badge> : null}
                  {!isCheckmate && isCheck ? (
                    <Badge color="yellow">Check</Badge>
                  ) : null}
                  {!isCheckmate && isGameOver ? (
                    <Badge color="gray">Game Over</Badge>
                  ) : null}
                </Group>
                <Group>
                  <Button onClick={reset}>Reset</Button>
                </Group>
              </Stack>
            </Group>
          </AppShell.Aside>
        )}
      </AppShell>
    </MantineProvider>
  );
}

export default App;
