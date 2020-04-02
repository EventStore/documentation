# Get Help

Got issues, questions, suggestions? Please read this page carefully to understand 
how you can get help working with EventStore.

## Questions

RTFM

## Bugs and issues

The last resort to get help when you experience some unexpected behaviour,
a crash or anything else that you consider a bug, is submitting an issue
at our GitHub repository.

::: warning
Please do not ignore our contribution guidelines, otherwise you risk your issue to be
closed without being considered. Respect the maintainers, be specific and provide
as many details about the issue as you can.
:::

Ensure you provide the following in the issue:
 - Expected behaviour
 - Actual behaviour
 - Why do you think it is an issue, not a misunderstanding
 - How the issue can be reproduced: a repository or at least a code snippet
 
## Contributing

Although issues are considered as contributions, we strongly suggest helping
the community by solving issues that you experienced by submitting a pull request.

Here are contribution guidelines:

 - Make each pull request atomic and exclusive; don't send pull requests for a laundry list of changes.
 - Even better, commit in small manageable chunks.
 - Use the supplied `.DotSettings` file to format the code.
 - Any change must be accompanied by a unit test covering the change.
 - No regions except for license header
 - Code must build for .NET Standard 2.1
 - Test must run on .NET Core 3.1
 - Use `autocrlf=true` (`git config --global core.autocrlf true` [http://help.github.com/dealing-with-lineendings/])
