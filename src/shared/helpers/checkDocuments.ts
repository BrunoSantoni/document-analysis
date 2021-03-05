export default function checkDocuments(urls: Array<string>): boolean {
  let invalidUrls = 0;

  urls.forEach(documentUrl => {
    const isValid = documentUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
    );

    if (isValid === null) {
      invalidUrls += 1;
    }
  });

  return invalidUrls === 0;
}
