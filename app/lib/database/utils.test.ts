import * as utils from './utils';

describe('sanitizeLikeStringTester', () => {
	// example chars that shouldn't return
	const disallowedChars = ',./;[]!@#$%^&*()_-=+~';
	const sanitizeLikeStringTester = (str: string) =>
		expect(utils.sanitizeLikeString(`${str}${disallowedChars}`)).toBe(`${str}${'_'.repeat(disallowedChars.length)}`);

	test('render empty', () => {
		expect(utils.sanitizeLikeString('')).toBe('');
		expect(utils.sanitizeLikeString(undefined)).toBe(undefined);
	});

	// Testing a couple of different alphabets
	test('render test (latin)', () => {
		sanitizeLikeStringTester('test123');
	});

	test('render test (arabic)', () => {
		sanitizeLikeStringTester('اختبار123');
	});

	test('render test (russian)', () => {
		sanitizeLikeStringTester('тест123');
	});

	test('render test (chinese trad)', () => {
		sanitizeLikeStringTester('測試123');
	});

	test('render test (japanese)', () => {
		sanitizeLikeStringTester('テスト123');
	});
});

describe('sanitizer', () => {
	test('render the same result', () => {
		const content = { a: true };
		expect(utils.sanitizer(content)).toBe(content);
	});
});

describe('query text removing regex', () => {

	// regex to select the query string used for mention suggestions from the message
	const regexp = /([^@p{L}]+)$/im;

	test('removing query text on suggestion autocomplete (latin)', () => {
		const message = 'Hey @test123';
		expect(message.replace(regexp, '')).toBe('Hey @');
	});

	test('removing query text on suggestion autocomplete (arabic)', () => {
		const message = 'Hey @اختبار123';
		expect(message.replace(regexp, '')).toBe('Hey @');
	});

	test('removing query text on suggestion autocomplete (russian)', () => {
		const message = 'Hey @тест123';
		expect(message.replace(regexp, '')).toBe('Hey @');
	});

	test('removing query text on suggestion autocomplete (chinese trad)', () => {
		const message = 'Hey @測試123';
		expect(message.replace(regexp, '')).toBe('Hey @');
	});

	test('removing query text on suggestion autocomplete (japanese)', () => {
		const message = 'Hey @テスト123';
		expect(message.replace(regexp, '')).toBe('Hey @');
	});

	test('removing query text on suggestion autocomplete (special characters in query)', () => {
		const message = "Hey @'=test123";
		expect(message.replace(regexp, '')).toBe('Hey @');
	});
});
