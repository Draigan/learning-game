type Props = { inputValue: string };

export const SpellingInput = (props: Props) => {
  const { inputValue } = props;
  return <input type="text" value={inputValue} readOnly />;
};
