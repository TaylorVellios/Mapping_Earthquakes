from collections import Counter
def sockMerchant(ar):
    x = [v/2 if v>=2 and v%2==0 else (v-1)/2 if v>2 else 0 for k,v in Counter(ar).items()]
    print(Counter(ar))
    return int(sum(x))


print(sockMerchant([int(i) for i in '4 5 5 5 6 6 4 1 4 4 3 6 6 3 6 1 4 5 5 5'.split()]))