import React, { useMemo } from 'react';
import IconButton from '../../../../components/IconButton';
import ToggleButton from '../../../../components/ToggleButton';
import BoldIcon from '../../../../assets/images/bold-icon.svg';
import { getSolidColorFromGradient, TextNode } from '@montagix/engine';
import ItalicIcon from '../../../../assets/images/italic-icon.svg';
import ButtonColorPicker from '../ButtonColorPicker';
import TextColorIcon from '../../../../assets/images/text-color-icon.svg';
import BackgroundIcon from '../../../../assets/images/background-icon.svg';
import RemoveBackgroundIcon from '../../../../assets/images/remove-background-icon.svg';
import Dropdown, { DropdownOption } from '../../../../components/Dropdown/Dropdown';
import { useEngineStoreContext } from '../../../../contexts/EngineStoreContext';
import DefaultToolbarOptions from '../DefaultToolbarOptions';
import { observer } from 'mobx-react-lite';
import './TextToolbarOptions.styles.scss';

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
  }

  function handleToggleBold(value: boolean) {
    node.style.fontWeight = value ? 'bold' : '400';
  }

  function handleToggleItalic(value: boolean) {
    node.style.fontStyle = value ? 'italic' : 'normal';
  }

  function handleChangeTextColor(color: string) {
    node.style.color = color;
  }

  function handleChangeBackgroundColor(color: string) {
    node.style.backgroundColor = color;
  }

  function handleRemoveBackgroundColor() {
    node.style.backgroundColor = null;
  }

  return (
    <div className='text-toolbar-options'>
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
            color: getSolidColorFromGradient(backgroundColor ?? 'transparent'),
          }}
          onChange={handleChangeBackgroundColor}
        />

        <IconButton
          icon={<RemoveBackgroundIcon />}
          onClick={handleRemoveBackgroundColor}
        />
      </DefaultToolbarOptions>
    </div>
  );
});

export default TextToolbarOptions;
