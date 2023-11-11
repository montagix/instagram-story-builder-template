import React, { useMemo } from 'react';
import IconButton from '../../../../components/IconButton';
import ToggleButton from '../../../../components/ToggleButton';
import BoldIcon from '../../../../assets/images/bold-icon.svg';
import { TextNode } from '@montagix/engine';
import ItalicIcon from '../../../../assets/images/italic-icon.svg';
import ButtonColorPicker from '../ButtonColorPicker';
import TextColorIcon from '../../../../assets/images/text-color-icon.svg';
import BackgroundIcon from '../../../../assets/images/background-icon.svg';
import RemoveBackgroundIcon from '../../../../assets/images/remove-background-icon.svg';
import Dropdown, {
  DropdownOption,
} from '../../../../components/Dropdown/Dropdown';
import { useEngineStoreContext } from '../../../../contexts/EngineStoreContext';
import DefaultToolbarOptions from '../DefaultToolbarOptions';
import { observer } from 'mobx-react-lite';

interface TextToolbarOptionsProps {
  node: TextNode;
}

const TextToolbarOptions = observer(({ node }: TextToolbarOptionsProps) => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();

  const isBold = node.style.fontWeight === 'bold';
  const isItalic = node.style.fontStyle === 'italic';
  const backgroundColor = node.style.backgroundColor;

  const fonts = useMemo(() => {
    const systemFonts: DropdownOption[] = [
      { value: 'Times New Roman', description: 'Times New Roman' },
      { value: 'Arial', description: 'Arial' },
    ];

    const externalFontsMap = engine.fontRegistry.fonts.reduce<
      Record<string, DropdownOption>
    >((acc, cv) => {
      acc[cv.font.family] = {
        value: cv.font.family,
        description: cv.font.family,
      };

      return acc;
    }, {});

    const externalFonts = Object.values(externalFontsMap);

    return [...systemFonts, ...externalFonts];
  }, [engine.fontRegistry.fonts.length]);

  const selectedFont = useMemo(() => {
    const font = (node as TextNode)?.style.fontFamily?.[0];

    try {
      return JSON.parse(font);
    } catch {
      return font;
    }
  }, [(node as TextNode)?.style.fontFamily]);

  function handleChangeFontFamily(font: string) {
    node.style.fontFamily = [font];
    node.style.update(node.sprite!);
  }

  function handleToggleBold(value: boolean) {
    node.style.fontWeight = value ? 'bold' : '400';
    node.style.update(node.sprite!);
  }

  function handleToggleItalic(value: boolean) {
    node.style.fontStyle = value ? 'italic' : 'normal';
    node.style.update(node.sprite!);
  }

  function handleChangeTextColor(color: string) {
    node.style.color = color;
    node.style.update(node.sprite!);
  }

  function handleChangeBackgroundColor(color: string) {
    node.style.backgroundColor = color;
    node.style.update(node.sprite!);
  }

  function handleRemoveBackgroundColor() {
    node.style.backgroundColor = null;
    node.style.update(node.sprite!);
  }

  return (
    <DefaultToolbarOptions node={node}>
      <Dropdown
        options={fonts}
        value={selectedFont}
        onChange={handleChangeFontFamily}
      />

      <ToggleButton
        icon={<BoldIcon />}
        enabled={isBold}
        onClick={handleToggleBold}
      />

      <ToggleButton
        icon={<ItalicIcon />}
        enabled={isItalic}
        onClick={handleToggleItalic}
      />

      <ButtonColorPicker
        icon={<TextColorIcon />}
        value={node.style.color}
        onChange={handleChangeTextColor}
        buttonStyle={{ color: node.style.color }}
      />

      <ButtonColorPicker
        icon={<BackgroundIcon />}
        value={backgroundColor ?? '#000000'}
        gradient
        buttonStyle={{
          // color: getSolidColorFromGradient(backgroundColor ?? 'transparent'),
          color: 'transparent'
        }}
        onChange={handleChangeBackgroundColor}
      />

      <IconButton
        icon={<RemoveBackgroundIcon />}
        onClick={handleRemoveBackgroundColor}
      />
    </DefaultToolbarOptions>
  );
});

export default TextToolbarOptions;
