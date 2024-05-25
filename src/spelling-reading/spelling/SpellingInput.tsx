type Props = { inputValue: string };

export const SpellingInput = (props: Props) => {
  const { inputValue } = props;
  return (
    <div className="spelling-word-form">
      <input type="text" value={inputValue} readOnly />
    </div>
  );
};
