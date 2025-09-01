# Bandit Problems and Algorithms

### What is a Bandit Problem?

A bandit problem is a type of decision-making problem where you must choose between several options, each with an unknown reward.

Imagine a game where several suitcases are lined up, each containing some hidden amount of money. You’re allowed to choose only a few of them, and your goal is to maximize your winnings. The challenge is that you don’t know how much is in each suitcase. It's unknown if your chosen suitcases have the highest reward.

The term bandit problem comes from the 1930's phrase "one armed bandit" which was a common term for slot machines. The nickname comes from the 'arm' at the side of the machine that you pull down in order for the game to begin. the 'bandit' part refers to either how the machine steals all of your money as you keep playing.

It is a popular decision-making analogy of a gambler playing a row of "k-armed bandits", trying to find the ones that pay out the most. The problem is to figure out which machines have the most rewards while balancing the risk of wasting plays on bad ones. This captures the core idea: learning to make better decisions under uncertainty.

### What is a Bandit Algorithm?

A Bandit Algorithm, often called a multi-armed bandit (MAB), is a machine learning technique used to make decisions under uncertainty. Bandit Algorithms balance exploration and exploitation where the algorithm chooses between exploring potentially better options and exploting options that are known to be good.

In the suitcase game example, suppose you discover that suitcase 1 holds $10 while suitcase 2 holds $20.
You can exploit this knowledge by repeatedly selecting those two. But what if other suitcases are hiding much larger rewards?
By exploring further, you might find that suitcase 5 contains $500 and suitcase 6 contains $600. Now, you can exploit this new knowledge and start selecting higher yielding suitcases.

Bandit algorithms are designed to manage the trade-off between exploration and exploitation in a systematic way.They help decide when to explore new possibilities and when to exploit what’s already been learned, all while trying to maximize rewards over time.

![Bandit Problem Cover](images/BanditProblemSlides/BanditProblemCover.png)
