# ao3-filter

Simple little browser extension which allows you to filter works from Archive of Our Own's (AO3) search using regular expressions.

## Installation

Unfortunately, there is no simple way to install this since to release to an extension on Google Chrome or Mozilla Firefox a lot of information has to be released. 

So you'll have to install the extension via side loading it.

For Chrome:

1. Download the latest zip from the [releases page](https://github.com/zamu-flowerpot/ao3-filter/releases).
2. Unpack the zip in some directory where the extension will live.
3. In Chrome go to `chrome://extensions` and click on `Lock Unpacked`, navigate to where the zip was unpacked and hit select.
4. Done!

For Firefox:

Unless you are running Firefox Nightly, you can't use this. Mozilla has taken a much harder stance on running unsigned extensions and since I'm not willing to submit it to their signing service, you're out of luck.

If you *are* using Firefox Nightly:

1. Download the latest zip from the [releases page](https://github.com/zamu-flowerpot/ao3-filter/releases).
3. In Firefox Nightly go to `about:config`, search `xpinstall.signatures.required`, and set it to false.
4. Once that is complete go to `about:addons', click on the gear in the top right underneath the search bar, and select `Install Add-on From File...`.
5. Navigate to the directory where the zip file is located and select it.
6. Done!

## Usage

The extension has one pane and no other configuration options.

The pane has two buttons and one text area which houses the terms you want to filter out.

The top button denotes whether the extension is on or off through a green checkmark or a red cross, respectively.

The text area takes regular expressions to search *each* work on a search page for the pattern and if found hide the work. Each line in the text area is a seperate regular expression and all regular expresions match *case-insensitve*.

The regex applies to the entire HTML of the work element, meaning that poorly constructed searches can lead to hiding all works.

Finally after adding some patterns to match against, the bottom button saves and applies the search right away. 

## How it works

This abuses regular expressions to either state whether a work is filtered or not. If it is filtered it sets the work to be hidden by toggling a CSS class which specifies `display: hidden;`. 

## Examples

Filter works which contain the term hiatus, haitus, hiitus, or haatus.

```
h[ai]{2}tus
```

Filter works on just containing a term like `twin`

```
twin
```

Filter works that have Hermione Granger in a pairing with anyone that is not Harry Potter. This does use some specific knowledge that the H/Hr pairing is `Hermione Granger/Harry Potter` on AO3.

```
hermione.granger\/(?!harry.potter)|\/hermione.granger
```

## Bugs/Comments/Etc.

Feel free to open an Issue if you discover a bug or weird edge case. If you just have a question or comment open up a discussion post. 

I generally don't see this breaking due to the code itself, but changes in the Browser Extension APIs and interfaces (ie. Manifest v2 vs v3). If it does and there isn't a fix, free free to push a pull request or just open an issue.
