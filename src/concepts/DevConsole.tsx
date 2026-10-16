import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Code2,
  GripHorizontal,
  Image,
  RotateCcw,
  Terminal,
  Hand,
  CircleHelp,
  Sparkles,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { projectPath } from '@/utils/routes';
import type { Language } from '@/utils/translations';
import type { PlayCopy } from './playCopy';
import { useInteractive } from './useInteractive';
import { useConsoleDrag } from './useConsoleDrag';
export type BotReaction = {
  mood: 'hello' | 'thinking' | 'celebrate';
  text: string;
  revision: number;
};
export type ReactToScene = (mood: BotReaction['mood'], text: string) => void;

type Channel = 'world' | 'code';
type Line = { text: string; command?: string; links?: boolean };

function ToyTerminal({
  t,
  language,
  react,
}: {
  t: PlayCopy;
  language: Language;
  react: ReactToScene;
}) {
  const [command, setCommand] = useState('');
  const [lines, setLines] = useState<Line[]>([{ text: t.welcome }]);
  const ready = useInteractive();
  const id = useId();
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [lines]);
  function run(value: string) {
    const input = value.trim().toLowerCase().slice(0, 48);
    if (!input) return;
    react(
      input === 'coffee' ? 'celebrate' : 'thinking',
      input === 'coffee' ? t.coffee : t.buddyLines[1],
    );
    if (input === 'clear') setLines([{ text: t.welcome }]);
    else {
      const response: Line =
        input === 'projects'
          ? { text: t.projects, links: true }
          : {
              text:
                input === 'help'
                  ? t.help
                  : input === 'about'
                    ? t.about
                    : input === 'coffee'
                      ? t.coffee
                      : t.unknown,
            };
      setLines((previous) => [...previous.slice(-2), { ...response, command: input }]);
    }
    setCommand('');
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    run(command);
  }
  return (
    <div className="toy-terminal">
      <div
        className="terminal-output"
        ref={output}
        role="log"
        aria-label={t.terminal}
        aria-live="polite"
      >
        {lines.map((line, index) => (
          <div className="terminal-line" key={index}>
            {line.command ? <span className="terminal-echo">$ {line.command}</span> : null}
            <p>{line.text}</p>
            {line.links ? (
              <div className="terminal-project-links">
                {projects.map((project) => (
                  <a key={project.id} href={projectPath(project.slug, language)}>
                    {project.name}
                    <ArrowUpRight size={10} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="terminal-command">
        <label htmlFor={id}>
          <span aria-hidden="true">$</span>
          <span className="sr-only">{t.command}</span>
        </label>
        <input
          id={id}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          maxLength={48}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          disabled={!ready}
        />
        <button disabled={!ready} aria-label={t.run}>
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </form>
      <div className="terminal-shortcuts">
        {['help', 'projects', 'coffee', 'clear'].map((item) => (
          <button disabled={!ready} type="button" onClick={() => run(item)} key={item}>
            {item}
          </button>
        ))}
      </div>
      <p className="terminal-toy-label">{t.toy}</p>
    </div>
  );
}

export function DeniBot({
  t,
  reaction,
  react,
}: {
  t: PlayCopy;
  reaction: BotReaction;
  react: ReactToScene;
}) {
  const [message, setMessage] = useState(-1);
  const ready = useInteractive();
  return (
    <div className="denibot" data-mood={reaction.mood}>
      <button
        className="denibot-button"
        disabled={!ready}
        aria-label={t.buddy}
        onClick={() => {
          const next = (message + 1) % t.buddyLines.length;
          setMessage(next);
          react(next === 1 ? 'thinking' : 'hello', t.buddyLines[next]);
        }}
      >
        <img
          key={reaction.revision}
          src={`/concepts/denibot${reaction.mood === 'hello' ? '' : '-' + reaction.mood}-320.webp`}
          srcSet={`/concepts/denibot${reaction.mood === 'hello' ? '' : '-' + reaction.mood}-160.webp 160w, /concepts/denibot${reaction.mood === 'hello' ? '' : '-' + reaction.mood}-320.webp 320w`}
          sizes="140px"
          width="320"
          height="320"
          alt=""
        />
        <span aria-hidden="true">
          {reaction.mood === 'celebrate' ? (
            <Sparkles size={13} />
          ) : reaction.mood === 'thinking' ? (
            <CircleHelp size={13} />
          ) : (
            <Hand size={13} />
          )}
        </span>
      </button>
      <div className="denibot-response">
        <span>{t.buddyName}</span>
        <p role="status">{reaction.text || t.buddy}</p>
      </div>
    </div>
  );
}

export function DevConsole({
  t,
  language,
  reaction,
  react,
}: {
  t: PlayCopy;
  language: Language;
  reaction: BotReaction;
  react: ReactToScene;
}) {
  const [channel, setChannel] = useState<Channel>('world');
  const [selectedProject, setSelectedProject] = useState<'karuplan' | 'qlinnt'>('karuplan');
  const { angle, device, change, handle } = useConsoleDrag(() => react('thinking', t.grabbing));
  const ready = useInteractive();
  const id = useId();
  return (
    <div className="dev-console" id="dev-console">
      <div className="console-caption">
        <h2>
          <Code2 size={16} aria-hidden="true" />
          {t.console}
        </h2>
        <span>DA—01 / CSS 3D</span>
      </div>
      <div className="console-stage">
        <div className="console-floor" aria-hidden="true" />
        <span className="floating-brace brace-left" aria-hidden="true">
          {'{'}
        </span>
        <span className="floating-brace brace-right" aria-hidden="true">
          {'}'}
        </span>
        <div
          className="console-device"
          ref={device}
          style={{ '--device-angle': angle + 'deg' } as CSSProperties}
        >
          <div className="device-side" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="device-bottom" aria-hidden="true" />
          <div className="device-front">
            <div className="device-topline">
              <span>
                <i /> denilson / dev.play
              </span>
              <button
                type="button"
                className="console-grip"
                aria-label={t.drag}
                disabled={!ready}
                {...handle}
                onKeyDown={(event) => {
                  if (
                    ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End'].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    change(
                      event.key === 'Home'
                        ? -25
                        : event.key === 'End'
                          ? 25
                          : angle + (['ArrowLeft', 'ArrowDown'].includes(event.key) ? -2 : 2),
                    );
                  }
                }}
              >
                <GripHorizontal size={16} aria-hidden="true" />
                <span>{t.grip}</span>
              </button>
            </div>
            <div className="device-screen" id={id} data-channel={channel}>
              {channel === 'world' ? (
                <div className="console-products">
                  <div
                    className="console-project-picker"
                    role="group"
                    aria-label={
                      language === 'es' ? 'Elegir proyecto de ejemplo' : 'Choose example project'
                    }
                  >
                    {(['karuplan', 'qlinnt'] as const).map((project) => (
                      <button
                        key={project}
                        type="button"
                        disabled={!ready}
                        aria-pressed={selectedProject === project}
                        onClick={() => setSelectedProject(project)}
                      >
                        {project === 'karuplan' ? 'Karuplan' : 'Qlinnt'}
                      </button>
                    ))}
                  </div>
                  <a className="console-capture" href={projectPath(selectedProject, language)}>
                    <img
                      src={`/projects/${selectedProject}-cover.webp`}
                      srcSet={`/projects/${selectedProject}-cover-480.webp 480w, /projects/${selectedProject}-cover-800.webp 800w, /projects/${selectedProject}-cover.webp 1200w`}
                      sizes="(max-width: 1000px) 85vw, 42vw"
                      width="1200"
                      height="700"
                      alt={
                        language === 'es'
                          ? `Captura del sitio público de ${selectedProject === 'karuplan' ? 'Karuplan' : 'Qlinnt'}`
                          : `Screenshot of the public ${selectedProject === 'karuplan' ? 'Karuplan' : 'Qlinnt'} website`
                      }
                    />
                    <span>
                      {language === 'es' ? 'Explorar el proyecto' : 'Explore the project'}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              ) : channel === 'code' ? (
                <ToyTerminal t={t} language={language} react={react} />
              ) : null}
            </div>
            <div className="console-channels" role="group" aria-label={t.channel}>
              {(
                [
                  { id: 'world', label: t.visual, Icon: Image },
                  { id: 'code', label: t.terminal, Icon: Terminal },
                ] as const
              ).map(({ id: key, label, Icon }) => (
                <button
                  disabled={!ready}
                  type="button"
                  key={key}
                  aria-pressed={channel === key}
                  aria-controls={id}
                  onClick={() => setChannel(key)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="device-brandline">
              <span>BUILT TO MAKE THINGS HAPPEN.</span>
              <span className="device-led" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="console-rotation">
        <label htmlFor={id + '-angle'}>{t.rotate}</label>
        <input
          id={id + '-angle'}
          type="range"
          min="-25"
          max="25"
          step="1"
          value={angle}
          disabled={!ready}
          onChange={(event) => change(Number(event.target.value))}
        />
        <button disabled={!ready} onClick={() => change(0)}>
          <RotateCcw size={13} aria-hidden="true" />
          {t.resetAngle}
        </button>
      </div>
      <p className="console-hint">{t.angleHint}</p>
      <DeniBot t={t} reaction={reaction} react={react} />
    </div>
  );
}
