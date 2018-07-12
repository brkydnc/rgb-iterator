class RGBIterator():
    __cases = {"00": 0, "02": 0, "12": 1, "10": 2, "20": 3, "21": 4, "01": 5}
    __queue = [1, 0, 2, 1, 0, 2]

    def __init__(self, pattern):
        self.__max_bound = max(pattern)
        self.__min_bound = min(pattern)
        self.__index = RGBIterator.__cases[str(pattern.index(max(pattern))) + str(pattern.index(min(pattern)))]
        self.__colors = pattern[:]

    @staticmethod
    def __even(n):
        return not (n % 2)

    def __is_index_task_done(self):
        if RGBIterator.__even(self.__index):
            return self.__colors[RGBIterator.__queue[self.__index]] == self.__max_bound
        else:
            return self.__colors[RGBIterator.__queue[self.__index]] == self.__min_bound

    def __do_index_task(self):
        if RGBIterator.__even(self.__index) and not self.__is_index_task_done():
            self.__colors[RGBIterator.__queue[self.__index]] += 1
        elif not RGBIterator.__even(self.__index) and not self.__is_index_task_done():
            self.__colors[RGBIterator.__queue[self.__index]] -= 1

    def next(self):
        if self.__is_index_task_done():
            self.__index = 0 if self.__index == len(RGBIterator.__queue) - 1 else self.__index + 1
        self.__do_index_task()
        return self.__colors[:]

iterator = RGBIterator([255, 1, 0])
print(iterator.next()) #[255, 1, 0]