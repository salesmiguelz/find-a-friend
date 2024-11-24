import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { ExampleService } from "./example.service";
import { ExampleError } from "./errors/example-error";
import { InMemoryExamplesRepository } from "@/repositories/in-memory/in-memory-examples-repository";

let examplesRepository: InMemoryExamplesRepository;
let exampleService: ExampleService;

describe("Check-in Service", () => {
  beforeEach(() => {
    examplesRepository = new InMemoryExamplesRepository();
    exampleService = new ExampleService(examplesRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should get fake date", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0));

    expect(new Date().getHours()).toEqual(8);
  });

  it("should throw Error", async () => {
    await expect(async () => {
      return exampleService.execute({ shouldError: true });
    }).rejects.toBeInstanceOf(ExampleError);
  });

  it("should not throw Error", async () => {
    const example = await examplesRepository.create({
      name: "example",
      email: "example",
    });

    expect(example.id).toEqual(expect.any(String));
  });
});
